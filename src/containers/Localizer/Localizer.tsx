import { useCallback, useEffect, useState } from "react";
import { IntlProvider } from "react-intl";

const DEFAULT_LANGUAGE = 'en';

const normalizeLocale = (langToNormalize: string): string => langToNormalize.split('-')[0];

const vocabularyLoader = async (lang: string = DEFAULT_LANGUAGE): Promise<any> => {
    try {
        return await import(`../../../translations/${lang}.json`);
    } catch(e) {
        if (lang === DEFAULT_LANGUAGE) {
            console.error(`Unable to fetch default ${DEFAULT_LANGUAGE} vocabulary`);
            throw e;
        }
        console.warn(`Unable to fetch vocabulary ${lang}, fallback to the default ${DEFAULT_LANGUAGE}`);
        return vocabularyLoader(DEFAULT_LANGUAGE);
    }
};

const useLanguage = (defaultLanguage=DEFAULT_LANGUAGE) => {
    const [language, setLanguage] = useState(navigator.language || defaultLanguage);

    const localizationCallback = useCallback(() => {
        setLanguage(navigator.language);
    }, []);
    useEffect(() => {
        window.addEventListener('languagechange', localizationCallback);
        return () => {
            window.removeEventListener('languagechange', localizationCallback);
        };
    }, []);
    return language;
}

const useLocalization = (): [string, {}] => {
    const language = useLanguage(DEFAULT_LANGUAGE);
    const [vocabulary, setVocabulary] = useState({});

    useEffect(() => {
        vocabularyLoader(normalizeLocale(language))
            .then(vocabulary => {
                setVocabulary(vocabulary);
            })
            .catch(() => {
                setVocabulary({});
            });
    }, [language]);

    return [language, vocabulary];
};

const Localizer: React.FC = (props) => {
    const [language, vocabulary] = useLocalization();
    return <IntlProvider locale={normalizeLocale(language)} messages={vocabulary}>{props.children}</IntlProvider>
}

export default Localizer;