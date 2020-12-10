import { t } from '@lingui/macro';
import { I18n } from "@lingui/react";
import React from 'react';

type LoginFailedProps = {
    uid: string;
    account: string;
    prevPassword: string;
    errorCode: number;
    errorMessage: string;
};


const LoginFailed = ({ uid, account, prevPassword, errorCode, errorMessage }: LoginFailedProps) => {
    return (
        <I18n>
            {({ i18n }) => (
                <div>
                    <h1>{i18n._(t`Login Failed`)}</h1>
                    <div>{`error message: ${errorMessage}`}</div>
                    <div>{`error code: ${errorCode}`}</div>
                    <form method="get" action={`/interaction/${uid}`}>
                        <input type='hidden' name="account" value={account} />
                        <input type='hidden' name="prevPassword" value={prevPassword} />
                        <button type="submit" >
                            {i18n._(t`Back`)}
                        </button>
                    </form>
                </div>
            )}
        </I18n>
    );
};

export function getServerSideProps(context: any) {
    const { query } = context;
    const { uid, account, password, errorCode, errorMessage } = query;

    return {
        props: {
            uid,
            account,
            prevPassword: password,
            errorCode,
            errorMessage
        },
    };
}

export default LoginFailed;
