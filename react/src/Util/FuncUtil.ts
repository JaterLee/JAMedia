function md5Hex(v = '') {
  return v?.slice(0, 40);
}

type ITimeoutData = {
  startTime: number;
  timeoutNumber: number;
  wait: number;
};
/**
 * 以传入的函数体内容进行md5处理后作为唯一的key，因此如果传入的fun函数体内容一模一样（从开发角度来说应该不会出现），可能会出现bug，尽量避免
 */
class _FuncUtil {
  /**
   * 节流的所有函数map
   */
  functionReqMap: Map<string, any>;
  /**
   * Map<string, {
    startTime: number,//调用的时间
    timeoutNumber: number,  //setTimeout的句柄
  }>
   */
  setTimeOutMap: Map<string, ITimeoutData>;
  constructor() {
    this.functionReqMap = new Map();
    this.setTimeOutMap = new Map();
  }
  /**
   * 节流函数（调用会立即触发，在wait时间内不再触发）
   * @param fun  业务函数
   * @param wait  等待时间（在等待时间内防止重复触发,默认1.5秒内拒绝所有数据）
   * @param rejectCallback  相同函数在等待时间内的回调，可空
   * 使用示例：wait可以不填写，默认1500毫秒，rejectCallback函数也可以不传递
   * FuncUtil.throttle(()=>{
   *     // todo
   * },500)
   */
  throttle(fun: () => void, wait: number = 1500, rejectCallback?: () => void) {
    let funcValue1 = fun.toString();
    let hash = md5Hex(funcValue1);
    let startTime = Date.now();
    if (this.functionReqMap.get(hash)) {
      let funcValue = this.functionReqMap.get(hash);
      // 防止因为特殊原因没有移除map中该函数的记录，导致一直无法执行函数的问题
      if (funcValue && funcValue.startTime + funcValue.wait <= startTime) {
        this.functionReqMap.delete(hash);
      } else {
        rejectCallback && rejectCallback();
        return;
      }
    }
    this.functionReqMap.set(hash, {
      startTime: startTime,
      wait: wait,
    });
    // 执行函数调用
    fun();
    // 拦截在wait期间的函数再次调用，在超时后，将限制解除
    setTimeout(() => {
      let needRemoveKeys: string[] = [];
      this.functionReqMap.forEach((value, key, map) => {
        let curTime = Date.now();
        let funcValue = map.get(key);
        if (funcValue && funcValue.startTime + funcValue.wait <= curTime) {
          // @ts-ignore
          needRemoveKeys.push(key);
        }
      });
      needRemoveKeys.map(value => {
        this.functionReqMap.delete(value);
      });
    }, wait);
  }
  /**
   * 防抖动函数，调用后会延迟wait时间执行，当在wait时间内再次对同一函数调用，则会取消之前的定时器，重新计时
   * @param fun
   * @param wait
   * @return {number} setTimeout的句柄，可以通过这个返回值 调用cancel接口取消延迟执行的函数
   */
  debounce(fun: () => void, wait = 1500) {
    let funcValue1 = fun.toString();
    let hash = md5Hex(funcValue1);
    if (this.setTimeOutMap.get(hash)) {
      clearTimeout(this.setTimeOutMap.get(hash)?.timeoutNumber!);
      this.setTimeOutMap.delete(hash);
    }
    // this.checkTimeOutNumber()
    let timeoutNumber = setTimeout(() => {
      this.setTimeOutMap.get(hash) &&
        clearTimeout(this.setTimeOutMap.get(hash)?.timeoutNumber!);
      this.setTimeOutMap.delete(hash);
      // 执行函数调用
      fun();
    }, wait);

    this.setTimeOutMap.set(hash, {
      // @ts-ignore
      timeoutNumber: timeoutNumber,
      startTime: new Date().getTime(),
      wait: 0,
    });
    // @ts-ignore
    return timeoutNumber;
  }

  /**
   * 取消延迟执行函数
   * @param number  debounce返回的timeout句柄
   */
  cancel(timeoutNumber?: NodeJS.Timeout) {
    if (timeoutNumber) {
      clearTimeout(timeoutNumber);
    }
  }
}

export const FuncUtil = new _FuncUtil();
