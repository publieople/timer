/**
 * Copyright (c) 2023-present Hengyang Zhang
 * 
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

type _Key =
    | 'desc'
    | 'button'
    | 'download'

export type HomeMessage = {
    [key in _Key]: string
}

const _default: Messages<HomeMessage> = {
    en: {
        desc: 'Timer can help you track the time you spent on browsing websites and the count of visit, with what you can insight and improve your web habits.',
        button: 'Start Now!',
        download: 'Install for {browser}',
    },
    zh_CN: {
        desc: '网费很贵是一个开源、免费的上网时间统计插件。它可以帮助您统计每天在每个网站上所花费的时间和访问次数。您可以借此来观察您的上网习惯，并通过为指定网站设置每天的浏览上限来改善它。',
        button: '如何使用',
        download: '在 {browser} 上安装',
    },
    zh_TW: {
        desc: '網費很貴是一個開源、免費的上網時間統計插件。它可以幫助您統計每天在每個網站上所花費的時間和訪問次數。您可以藉此來觀察您的上網習慣，並通過為指定網站設置每天的瀏覽上限來改善它。',
        button: '如何使用',
        download: '在 {browser} 上安裝',
    },
    ja: {
        desc: 'この拡張機能は、ウェブサイトの閲覧に費やした時間と訪問回数を追跡するのに役立ち、ウェブ習慣を洞察して改善することができます.',
        button: 'すぐに始めましょう',
        download: '{browser} にインストール',
    }
}

export default _default
