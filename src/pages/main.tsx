import { t } from '@lingui/macro';
import { I18n } from "@lingui/react";
import React from 'react';

const Main = () => {
    return (
        <I18n>
            {({ i18n }) => (
                <div className="container">
                    <div className="jumbotron">
                        <h1>ewoosoft</h1>
                        <form action={`/interaction/test`} method="get">
                            <input type="submit" value={i18n._(t`Go to Login`)} />
                        </form>
                    </div>
                </div>
            )}
        </I18n>
    );
};

export default Main;
