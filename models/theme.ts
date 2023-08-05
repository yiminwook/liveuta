'use client';

import Cookies from 'universal-cookie';

class ThemeCookie {
  private theme: string = 'theme1';

  public constructor() {
    this.init();
  }

  public init() {
    if (typeof window === 'undefined') return;
    let initialTheme = document.documentElement.getAttribute('color');

    if (initialTheme === undefined || initialTheme === null) {
      // cookie에 저장된 값이 없을 경우, theme1 쿠키를 생성
      console.log('create themeCookie', initialTheme);
      this.setCookie('theme1');
      initialTheme = 'theme1';
    }

    this.theme = initialTheme;
  }

  public setState(nextTheme: string) {
    this.theme = nextTheme;
    document.documentElement.setAttribute('color', this.theme);
    this.setCookie(this.theme);
  }

  public reset() {
    this.setState('theme1');
  }

  public get currentTheme() {
    return this.theme;
  }

  /** this.data를 cookie에 저장 */
  private setCookie(theme: string) {
    const themeCookie = new Cookies();
    themeCookie.set('theme', theme, { path: '/' });
  }
}

export default ThemeCookie;

export const themeCookie = new ThemeCookie();
