/*
 * @Author: yangyongqian
 * @Date: 2023-07-24 22:07:56
 * @Description:全局工具方法
 */
import moment from 'moment'
moment.locale('zh-cn')

const timeFormat = {
  dateFormat: (value) => {
    return moment(value).format('LLL')
  }
}

export default timeFormat
