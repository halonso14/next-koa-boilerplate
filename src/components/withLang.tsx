import * as React from 'react';
import { I18nProvider } from '@lingui/react';
import type { Catalog, Catalogs } from '@lingui/core/i18n';
import detectLanguage from '../common/i18n/locale';

const enMessages: Catalog = require('../common/i18n/en/messages.js');
const koMessages: Catalog = require('../common/i18n/ko/messages.js');

interface WithLangProps {
    language: string;
    catalogs: Catalogs;
}

const catalogs: Catalogs = {
    en: enMessages,
    ko: koMessages,
};

const withLang = (Component: any) => {
    return class WithLang extends React.Component<WithLangProps> {
        static async getInitialProps({ Component, ctx }: any) {
            const language = detectLanguage(ctx.req);
            const props = await Promise.all([
                Component.getInitialProps ? Component.getInitialProps(ctx) : {},
            ]);

            return {
                ...props,
                language,
                catalogs,
            };
        }

        render() {
            const { language, catalogs, ...restProps } = this.props;

            return (
                <I18nProvider language={language} catalogs={catalogs}>
                    <Component {...restProps} />
                </I18nProvider>
            );
        }
    };
};

export default withLang;
