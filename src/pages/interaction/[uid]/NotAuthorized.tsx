import { t } from '@lingui/macro';
import { I18n } from '@lingui/react';
import * as React from 'react';

type NotAuthorizedProps = {
    uid: string;
    account: string;
    prevPassword: string;
};

const NotAuthorized = ({ uid, account, prevPassword }: NotAuthorizedProps) => {
    return (
        <I18n>
            {({ i18n }) => (
                <div>
                    <h1>{i18n._(t`Not Authorized`)}</h1>
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

export default NotAuthorized;
