import { t } from '@lingui/macro';
import { I18n } from '@lingui/react';
import * as React from 'react';

type ChangePasswordProps = {
    uid: string;
    account: string;
    password: string;
    newPassword: string;
    confirmPassword: string;
    passwordErrorMessage: string;
};

const ChangePassword = ({
    uid,
    account,
    password,
    newPassword,
    confirmPassword,
    passwordErrorMessage,
}: ChangePasswordProps) => {
    const [currentPasswordState, setCurrentPasswordState] = React.useState<string>(password);
    const [newPasswordState, setNewPasswordState] = React.useState<string>(newPassword);
    const [confirmPasswordState, setConfirmPasswordState] = React.useState<string>(confirmPassword);
    return (
        <I18n>
            {({ i18n }) => (
                <div>
                    <h1>{i18n._(t`Change Password`)}</h1>
                    <form method="post" action={`/interaction/${uid}/ChangePassword`}>
                        <input type="hidden" name="account" value={account} />
                        <input
                            required
                            type="text"
                            name="password"
                            value={currentPasswordState}
                            onChange={(e) => setCurrentPasswordState(e.target.value)}
                        />
                        <br />
                        <input
                            required
                            type="text"
                            name="newPassword"
                            value={newPasswordState}
                            onChange={(e) => setNewPasswordState(e.target.value)}
                        />
                        <br />
                        <input
                            required
                            type="text"
                            name="confirmPassword"
                            value={confirmPasswordState}
                            onChange={(e) => setConfirmPasswordState(e.target.value)}
                        />
                        <br />
                        <div>{passwordErrorMessage}</div>
                        <button type="submit">{i18n._(t`Change`)}</button>
                    </form>
                    <form method="get" action={`/interaction/${uid}`}>
                        <input type="hidden" name="account" value={account} />
                        <input type="hidden" name="prevPassword" value={password} />
                        <button type="submit">{i18n._(t`Back`)}</button>
                    </form>
                </div>
            )}
        </I18n>
    );
};

export function getServerSideProps(context: any) {
    const { query } = context;
    const { uid, account, password, newPassword, confirmPassword, passwordErrorMessage } = query;
    return {
        props: {
            uid,
            account,
            password,
            newPassword,
            confirmPassword,
            passwordErrorMessage,
        },
    };
}

export default ChangePassword;
