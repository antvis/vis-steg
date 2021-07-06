/**
 * merge the options and defaults
 * @param options
 * @param defaults
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
