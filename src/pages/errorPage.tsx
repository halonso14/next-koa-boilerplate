
import { t } from '@lingui/macro';
import { I18n } from "@lingui/react";
import React from 'react';

type ErrorPageProps = {
    error_name: string;
};

const ErrorPage = ({ error_name }: ErrorPageProps) => {
    return (
        <I18n>
            {({ i18n }) => (
                <div className="container">
                    <h1>Error</h1>
                    <div>{error_name + ' ' + i18n._(t`error has occured`)}</div>
                </div>
            )}
        </I18n>
    );
};

export function getServerSideProps(context: any) {
    const { req, query } = context;
    const { error_name } = query;
    return {
        props: {
            error_name
        },
    };
}

export default ErrorPage;
