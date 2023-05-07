/**
 * Copyright (c) 2023-present Hengyang Zhang
 * 
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

export type VirtualMessage = {
    title: string
    p1: string
    step: {
        title: string
        enter: string
        click: string
        form: string
        browse: string
    }
}

const _default: Messages<VirtualMessage> = {
    en: {
        title: 'Count data for specific URLs',
        p1: 'If you want to count the browsing time and number of visits of certain URLs, not just the domain name, '
            + 'you can do so by creating a virtual site.',
        step: {
            title: 'Four steps to create a virtual site',
            enter: 'First, enter the management page{link}, click the menu item {menuItem}.',
            click: 'Click the New button in the upper right corner.',
            form: 'Then, fill in the URL to count, Ant expressions is allowed, such as {demo1} or {demo2}, and the name of this virtual site, '
                + 'and then click Save.',
            browse: 'Finally, Browse the relevant URLs and observe the data.',
        }
    },
    zh_CN: {
        title: '统计特定 URL 的数据',
        p1: '如果你想统计某些 URL ，而不只是域名的浏览时长和访问次数，可以通过创建虚拟站点来实现。',
        step: {
            title: '简单四步创建一个虚拟站点',
            enter: '首先进入管理页{link}，点击菜单项【{menuItem}】。',
            click: '然后单击右上角的新建按钮。',
            form: '填写要统计的 URL，可以使用 Ant 表达式，如 {demo1} 或 {demo2} ，以及这个虚拟站点的名称，然后点击保存。',
            browse: '最后浏览相关的网页，观察数据。'
        }
    },
    zh_TW: {
        title: '統計特定 URL 的數據',
        p1: '如果你想統計某些 URL ，而不只是域名的瀏覽時長和訪問次數，可以通過創建虛擬站點來實現。',
        step: {
            title: '簡單四步創建一個虛擬站點',
            enter: '首先進入管理頁{link}，點擊菜單項【{menuItem}】。',
            click: '然後單擊右上角的新建按鈕。',
            form: '填寫要統計的 URL，可以使用 Ant 表達式，如 {demo1} 或 {demo2} ，以及這個虛擬站點的名稱，然後點擊保存。',
            browse: '最後瀏覽相關的網頁，觀察數據。',
        },
    },
    ja: {
        title: '特定の URL のデータをカウントする',
        p1: 'ドメイン名だけでなく、特定の URL の閲覧時間と訪問回数をカウントしたい場合は、仮想サイトを作成することで実行できます。',
        step: {
            title: '仮想サイトを作成するための 4 つのステップ',
            enter: 'まず、管理ページ{link}に入り、メニュー項目{menuItem}をクリックします。',
            click: '右上隅にある [新規] ボタンをクリックします。',
            form: '次に、カウントする URL、{demo1} または {demo2} などの Ant 式が許可されていること、およびこの仮想サイトの名前を入力し、[保存] をクリックします。',
            browse: '最後に、関連する URL を参照してデータを観察します。',
        }
    },
}

export default _default
