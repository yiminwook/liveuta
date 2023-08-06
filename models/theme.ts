'use client';

import Cookies from 'universal-cookie';

class ThemeCookie {
  private theme: string = 'theme1';

  public constructor() {
    this.init();
  }

  public init() {
    if (typeof window === 'undefined') return;
    this.theme = document.documentElement.getAttribute('color') || 'theme1';
    this.setCookie(this.theme); // 접속시 쿠키를 새로 생성
  }

  public setState(nextTheme: string) {
    this.theme = nextTheme;

    this.setAttribute(this.theme);
    this.setCookie(this.theme);
  }

  public reset() {
    this.setState('theme1');
  }

  public get currentTheme() {
    return this.theme;
  }

  /** theme를 document에 저장 */
  private setAttribute(theme: string) {
    document.documentElement.setAttribute('color', theme);
  }

  /** theme를 cookie에 저장 */
  private setCookie(theme: string) {
    const themeCookie = new Cookies();
    themeCookie.set('theme', theme, { path: '/', maxAge: 60 * 60 * 24 * 30 * 3 }); //3개월 저장
  }
}

export default ThemeCookie;

export const themeCookie = new ThemeCookie();
