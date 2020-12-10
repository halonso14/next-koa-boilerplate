import { t } from '@lingui/macro';
import { I18n } from '@lingui/react';
import * as React from 'react';

type PasswordChangedProps = {
    uid: string;
    account: string;
};

const PasswordChanged = ({ uid, account }: PasswordChangedProps) => {
    return (
        <I18n>
            {({ i18n }) => (
                <div>
                    <h1>{i18n._(t`Password Changed`)}</h1>
                    <form method="get" action={`/interaction/${uid}`}>
                        <input type="hidden" name="account" value={account} />
                        <button type="submit">{i18n._(t`Login`)}</button>
                    </form>
                </div>
            )}
        </I18n>
    );
};

export function getServerSideProps(context: any) {
    const { query } = context;
    const { uid, account } = query;
    return {
        props: {
            uid,
            account,
        },
    };
}

export default PasswordChanged;
