import 'server-only';

const dictionaries = {
  en: () => import('./dictionaries/en.json').then((module) => module.default),
  kr: () => import('./dictionaries/kr.json').then((module) => module.default),
  jp: () => import('./dictionaries/jp.json').then((module) => module.default),
};

export const getDictionary = async (locale: 'en' | 'kr' | 'jp') => dictionaries[locale]();
