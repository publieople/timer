/**
 * Copyright (c) 2021 Hengyang Zhang
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { extractSiteName } from "../../src/util/site"

test('extract site name', () => {
    expect(extractSiteName('Product Hunt – The best new products in tech.')).toEqual('Product Hunt')
    expect(extractSiteName('Product Hunt – The - best new products in tech.')).toEqual('The')

    expect(extractSiteName('Office 365 登录 | Microsoft Office')).toEqual('Microsoft Office')
    expect(extractSiteName('首页 - 知乎')).toEqual('知乎')
})