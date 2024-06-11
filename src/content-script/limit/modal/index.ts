import { LimitReason, LimitType, MaskModal } from '../common'
import { getUrl, sendMsg2Runtime } from '@api/chrome/runtime'
import { TAG_NAME, type RootElement } from '../element'
import { App, createApp, Ref } from 'vue'
import Main from './Main'
import { provideDelayHandler, provideReason } from './context'
import { init as initTheme, toggle } from '@util/dark-mode'
import optionService from '@service/option-service'

async function exitFullscreen(): Promise<void> {
    if (!document?.fullscreenElement) return
    if (!document?.exitFullscreen) return
    try {
        await document.exitFullscreen()
    } catch (e) {
        console.warn('Failed to exit fullscreen', e)
    }
}

function pauseAllVideo(): void {
    const elements = document?.getElementsByTagName('video')
    if (!elements) return
    Array.from(elements).forEach(video => {
        try {
            video?.pause?.()
        } catch { }
    })
}

function pauseAllAudio(): void {
    const elements = document?.getElementsByTagName('audio')
    if (!elements) return
    Array.from(elements).forEach(audio => {
        try {
            audio?.pause?.()
        } catch { }
    })
}

function isSameReason(a: LimitReason, b: LimitReason): boolean {
    let same = a?.id === b?.id && a?.type === b?.type
    if (!same) return false
    if (a?.type === 'DAILY' || a?.type === 'VISIT') {
        // Need judge allow delay
        same = same && a?.allowDelay === b?.allowDelay
    }
    return same
}

const TYPE_SORT: { [reason in LimitType]: number } = {
    PERIOD: 0,
    VISIT: 1,
    DAILY: 2,
}

class ModalInstance implements MaskModal {
    url: string
    rootElement: RootElement
    body: HTMLBodyElement
    delayHandlers: (() => void)[] = [
        () => sendMsg2Runtime('cs.moreMinutes', this.url),
    ]
    reasons: LimitReason[] = []
    reason: Ref<LimitReason>
    app: App<Element>

    constructor(url: string) {
        this.url = url
    }

    addReason(reason: LimitReason): void {
        const exist = this.reasons.some(r => isSameReason(r, reason))
        if (exist) return
        this.reasons.push(reason)
        // Sort
        this.reasons.sort((a, b) => TYPE_SORT[a.type] - TYPE_SORT[b.type])
        this.refresh()
    }

    removeReason(reason: LimitReason): void {
        this.reasons = this.reasons?.filter(r => !isSameReason(r, reason))
        this.refresh()
    }

    removeReasonsByType(type: LimitType): void {
        this.reasons = this.reasons?.filter(r => r.type !== type)
        this.refresh()
    }

    addDelayHandler(handler: () => void): void {
        if (!handler) return
        if (this.delayHandlers?.includes(handler)) return
        this.delayHandlers?.push(handler)
    }

    private refresh() {
        const reason = this.reasons?.[0]
        reason ? this.show(reason) : this.hide()
    }

    private async init() {
        // 1. Create mask element
        const root = await this.prepareRoot()
        const html = document.createElement('html')
        root.append(html)

        // header
        const header = document.createElement('header')
        html.append(header)
        const style = document.createElement('link')
        style.type = 'text/css'
        style.rel = 'stylesheet'
        style.href = getUrl('content_scripts.css')
        header.append(style)

        // body
        const body = this.body = document.createElement('body')
        html.append(body)

        // 2. Init dark mode
        initTheme(html)
        optionService.isDarkMode().then(val => toggle(val, html))

        // 3. Init vue app instance
        this.app = createApp(Main)
        this.reason = provideReason(this.app)
        provideDelayHandler(this.app, () => this.delayHandlers?.forEach(h => h?.()))
        this.app.mount(body)
    }

    private async prepareRoot(): Promise<ShadowRoot> {
        const inner = () => {
            const exist = this.rootElement || document.querySelector(TAG_NAME) as RootElement
            if (exist) {
                this.rootElement = exist
                return exist.shadowRoot
            }
            this.rootElement = document.createElement(TAG_NAME) as RootElement
            document.body.appendChild(this.rootElement)
            return this.rootElement.attachShadow({ mode: 'open' })
        }
        if (document.body) {
            return inner()
        } else {
            return new Promise(resolve => {
                window.addEventListener('load', () => resolve(inner()))
            })
        }
    }

    private async show(reason: LimitReason) {
        if (!this.rootElement) {
            await this.init()
        }
        await exitFullscreen()
        // Scroll to top
        scrollTo(0, 0)
        pauseAllVideo()
        pauseAllAudio()

        this.reason.value = reason
        if (document?.documentElement) {
            document.documentElement.style.setProperty('overflow', 'hidden', 'important')
        }
        this.body.style.display = 'block'
    }

    private hide() {
        document?.documentElement && (document.documentElement.style.overflow = '')
        this.body && (this.body.style.display = 'none')
        this.reason && (this.reason.value = null)
    }
}

export default ModalInstance
