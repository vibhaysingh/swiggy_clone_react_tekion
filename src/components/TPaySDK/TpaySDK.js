import React from 'react'
import SDKContainer from '@tekion/tekion-pay-sdk/src';

function TpaySDK(props) {
    const{transactionToken,successCallBack,failureCallBack,onProgressCallBack,onSdkLoadCallBack,onTransactionLockCallBack}=props;
  return (
    <SDKContainer
    transactionToken={transactionToken}
    onSuccess={successCallBack}
    onFailure={failureCallBack}
    onProgress={onProgressCallBack}
    onSdkLoad={onSdkLoadCallBack}
    onTransactionLock={onTransactionLockCallBack}
    // {...restProps}
  />
  )
}

export default TpaySDK