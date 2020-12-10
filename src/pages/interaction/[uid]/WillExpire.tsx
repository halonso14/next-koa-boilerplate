import { t } from '@lingui/macro';
import { I18n } from "@lingui/react";
import React from 'react';

type WillExpireProps = {
    uid: string;
    account: string;
    password: string;
};


const WillExpire = ({ uid, account, password }: WillExpireProps) => {
    // MEMO : only correct login info comes here
    const SKIP_LOGIN = "skip";
    return (
        <I18n>
            {({ i18n }) => (
                <div>
                    <h1>{i18n._(t`Will Expire`)}</h1>
                    <form method="get" action={`/interaction/${uid}/changePassword`}>
                        <input type='hidden' name="account" value={account} />
                        <input type='hidden' name="password" value={password} />
                        <button type="submit">
                            {i18n._(t`Change`)}
                        </button>
                    </form>
                    <form method="post" action={`/interaction/${uid}/login`}>
                        <input type='hidden' name="skipLogin" value={SKIP_LOGIN} />
                        <input type='hidden' name="account" value={account} />
                        <input type='hidden' name="password" value={password} />
                        <button type="submit">
                            {i18n._(t`Later`)}
                        </button>
                    </form>
                </div>
            )}
        </I18n>
    );
};

export function getServerSideProps(context: any) {
    const { query } = context;
    const { uid, account, password } = query;

    return {
        props: {
            uid,
            account,
            password,
        },
    };
}

export default WillExpire;
