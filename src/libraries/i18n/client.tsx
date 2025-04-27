"use client";
import { i18next } from "./i18next";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useTranslation as useTranslationClient } from "react-i18next";
import { TLocaleCode } from "./type";
import { usePathname as useNextPathname } from "next/navigation";

const runsOnServerSide = typeof window === "undefined";

export function useTranslations(options?: Parameters<typeof useTranslationClient>[1]) {
  const locale = useLocale();
  const [activeLng, setActiveLng] = useState(i18next.resolvedLanguage);

  useEffect(() => {
    if (activeLng === i18next.resolvedLanguage) return;
    setActiveLng(() => i18next.resolvedLanguage);
  }, [activeLng]);

  useEffect(() => {
    if (!locale || i18next.resolvedLanguage === locale) return;
    i18next.changeLanguage(locale);
  }, [locale]);

  if (runsOnServerSide && i18next.resolvedLanguage !== locale) {
    i18next.changeLanguage(locale);
  }

  return useTranslationClient(undefined, options);
}

export const useLocale = () => {
  const params = useParams<{ locale?: TLocaleCode }>();

  if (!params.locale) {
    throw new Error("Locale Layout is required");
  }

  return params.locale;
};

export const usePathname = () => {
  const pathname = useNextPathname();
  const locale = useLocale();

  return pathname.replace(`/${locale}`, "");
};
