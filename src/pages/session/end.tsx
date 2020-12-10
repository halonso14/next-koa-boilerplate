import { t } from '@lingui/macro';
import { I18n } from '@lingui/react';
import * as React from 'react';

type SessionProps = {
    xsrf: string;
};

const Logout = ({ xsrf }: SessionProps) => {
    return (
        <I18n>
            {({ i18n }) => (
                <div className="container">
                    <div className="jumbotron">
                        <h1>ewoosoft</h1>
                        <form action="/oauth/session/end/confirm" method="post">
                            <label>{i18n._(t`Are sure logging out?`)}</label>
                            <br />
                            <input type="hidden" name="xsrf" value={xsrf} />
                            <button type="submit" name="logout" value="yes">
                                {i18n._(t`Yes`)}
                            </button>
                            <button type="submit">{i18n._(t`No`)}</button>
                        </form>
                    </div>
                </div>
            )}
        </I18n>
    );
};

export function getServerSideProps(context: any) {
    return {
        props: context.query,
    };
}

export default Logout;
