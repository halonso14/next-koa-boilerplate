import { t } from '@lingui/macro';
import { I18n } from '@lingui/react';
import * as React from 'react';

type InteractionProps = {
  uid: string;
  account: string;
  prevPassword: string;
  accountMessage: string;
  passwordMessage: string;
};

const Interaction = ({
  uid,
  account,
  prevPassword,
  accountMessage,
  passwordMessage,
}: InteractionProps) => {
  const [username, setUsername] = React.useState(account);
  const [password, setPassword] = React.useState(prevPassword);
  const errorCode = -1021;
  const errorMessage = 'Error occured.';

  return (
    <I18n>
      {({ i18n }) => (
        <div className="container">
          <div className="jumbotron">
            <h1>LOGIN</h1>
            <div>{i18n._(t`Account`)}</div>
            <form>
              <input
                required
                type="text"
                name="account"
                placeholder={i18n._(t`Enter any login`)}
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <div>{accountMessage}</div>
              <br />
              <div>{i18n._(t`Password`)}</div>
              <input
                required
                type="password"
                name="password"
                placeholder={username ? i18n._(t`wrong login info`) : i18n._(t`and password`)}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <input type="hidden" name="errorCode" value={errorCode} />
              <input type="hidden" name="errorMessage" value={errorMessage} />
              <div>{passwordMessage}</div>
              <br />
              <button type="submit" formMethod="post" formAction={`/interaction/${uid}/login`}>
                {i18n._(t`Login - success`)}
              </button>
              <br />
              <button
                type="submit"
                formMethod="get"
                formAction={`/interaction/${uid}/NotAuthorized`}
              >
                {i18n._(t`Login - not authorized`)}
              </button>
              <br />
              <button type="submit" formMethod="get" formAction={`/interaction/${uid}/LoginFailed`}>
                {i18n._(t`Login - login failed`)}
              </button>
              <br />
              <button type="submit" formMethod="get" formAction={`/interaction/${uid}/WillExpire`}>
                {i18n._(t`Login - will expire`)}
              </button>
              <br />
              <button type="submit" formMethod="get" formAction={`/interaction/${uid}/HasExpired`}>
                {i18n._(t`Login - has expired`)}
              </button>
              <br />
              <button
                type="submit"
                formMethod="get"
                formAction={`/interaction/${uid}/ChangePassword`}
              >
                {i18n._(t`Login - change password`)}
              </button>
              <br />
            </form>
          </div>
        </div>
      )}
    </I18n>
  );
};

export function getServerSideProps(context: any) {
  const { req, query } = context;
  const { uid } = query;
  const account = query.account || '';
  const prevPassword = query.prevPassword || '';

  let accountMessage;
  let passwordMessage;
  if (req.body) {
    accountMessage = query.accountMessage;
    passwordMessage = query.passwordMessage;
  } else {
    accountMessage = '';
    passwordMessage = '';
  }

  return {
    props: {
      uid,
      account,
      prevPassword,
      accountMessage,
      passwordMessage,
    },
  };
}

export default Interaction;
