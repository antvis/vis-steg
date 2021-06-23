/**
 * 合并默认值
 * @param options - 需要初始化的对象
 * @param defaults - 默认值
 */
export function initOptions<T, U>(options: T, defaults: U): T & U {
  const def: any = { ...defaults };
  Object.entries(options || {}).forEach(([key, value]) => {
    if (value !== undefined) {
      def[key] = value;
    }
  });
  return def;
}
