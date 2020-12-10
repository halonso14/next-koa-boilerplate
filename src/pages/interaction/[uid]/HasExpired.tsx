import { t } from '@lingui/macro';
import { I18n } from '@lingui/react';
import * as React from 'react';

type HasExpiredProps = {
    uid: string;
    account: string;
    prevPassword: string;
};

const HasExpired = ({ uid, account, prevPassword }: HasExpiredProps) => {
    return (
        <I18n>
            {({ i18n }) => (
                <div>
                    <h1>{i18n._(t`Has Expire`)}</h1>
                    <form method="get" action={`/interaction/${uid}/changePassword`}>
                        <input type="hidden" name="account" value={account} />
                        <input type="hidden" name="password" value={prevPassword} />
                        <button type="submit">{i18n._(t`Change`)}</button>
                    </form>
                    <form method="get" action={`/interaction/${uid}`}>
                        <input type="hidden" name="account" value={account} />
                        <input type="hidden" name="prevPassword" value={prevPassword} />
                        <button type="submit">{i18n._(t`Back`)}</button>
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
            prevPassword: password,
        },
    };
}

export default HasExpired;
