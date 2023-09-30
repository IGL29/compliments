class DateService {
  public static toFormat(value: Date, options?: Intl.DateTimeFormatOptions): string {
    const date = new Date(value);
    const formatter = Intl.DateTimeFormat('ru', options);
    return formatter.format(date);
  }
}

export { DateService };
