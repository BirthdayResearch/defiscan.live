export function isAlphanumeric(input: string, ignore?: string): boolean {
  const re = /^[0-9A-Z]+$/i;

  let str = input;

  if (ignore !== undefined) {
    str = input.replace(
      new RegExp(
        "[".concat(ignore.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&"), "]"),
        "g"
      ),
      ""
    );
  }

  return re.test(str);
}

export function isNumeric(input: string): boolean {
  const re = /^[0-9]+$/;

  return re.test(input);
}
