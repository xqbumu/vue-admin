/**
 * Created by zzmhot on 2017/3/26.
 *
 * @author: zzmhot
 * @github: https://github.com/zzmhot
 * @email: zzmhot@163.com
 * @Date: 2017/3/26 15:14
 * @Copyright(©) 2017 by zzmhot.
 *
 */

var Mock = require('mockjs')
var portCode = require('../../src/common/port_uri').portCode

exports.image_upload = Mock.mock({
  code: portCode.success,
  msg: '图片上传成功',
  data: {
    'id|10-100': 1,
    'name': '@ctitle',
    'image': '@image'
  }
})
