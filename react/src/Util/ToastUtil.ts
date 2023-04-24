import Toast from 'react-native-root-toast';

export class ToastUtil {
  /**
   *
   * @param {string} message
   * @param {{}} options
   */
  static show(message: string) {
    if (message && message?.trim()) {
      Toast.show(message, {
        position: Toast.positions.CENTER,
        duration: Toast.durations.SHORT,
        containerStyle: {borderRadius: 4, marginHorizontal: 25},
      });
    }
  }

  static LONG = Toast.durations.LONG;
  static SHORT = Toast.durations.SHORT;
}
