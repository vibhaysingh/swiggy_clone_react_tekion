import React from 'react';
import styles from './PaymentIframe.module.css';


const PaymentIframe = props => {
  const { onLoad, reference } = props;
  const TEKION_SDK_IFRAME_URL='https://tst-tpay-sdk.tekion.xyz/tpay-sdk-ui/';
  // const transactionToken= 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJjbGllbnRJZCI6InRwYXlfMWY5UFl6Mm1uTiIsImlzcyI6IlRFS0lPTl9XQUxMRVRfVE9LRU5fR0VORVJBVElPTl9TRVJWSUNFIiwiZXhwIjoxNjg2ODE1MTcwLCJpYXQiOjE2ODY4MTQxNTAsInRyYW5zYWN0aW9uSWQiOiJjYmZiMjdlMi1hZGEyLTQyZmEtOGM3ZS1jZGQ3NDIxMmJkMzIifQ.89k-qWWXeFqKdaszRymeW90kwPmCoVuNXHvNvX0WAeQ';
  return (
    <iframe
      ref={reference}
      className={styles.iframe}
      src={`${TEKION_SDK_IFRAME_URL}`}
      title={'Tpay-SDK'}
      onLoad={onLoad}
    />
  );
};

export default PaymentIframe;