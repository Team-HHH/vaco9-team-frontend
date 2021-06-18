import { parseISO, differenceInCalendarDays } from 'date-fns';

import { errorOccured } from '../reducers/error';
import { fetchPaymentResult } from '../apis/payment';

export const requestPay = async (info, link, dispatch) => {
  const {
    merchantId,
    title,
    dailyBudget,
    expiresAt,
    userEmail,
    userName,
  } = info;
  const campaignDuration = differenceInCalendarDays(parseISO(expiresAt), new Date());

  const IMP = window.IMP;
  IMP.init(process.env.REACT_APP_IMPORT_ID);

  try {
    IMP.request_pay({
      pg: 'html5_inicis',
      pay_method: 'card',
      merchant_uid: merchantId,
      name: title,
      amount: dailyBudget * campaignDuration,
      buyer_email: userEmail,
      buyer_name: userName,
    }, async (rsp) => {
      if (rsp.success) {
        const { imp_uid, merchant_uid } = rsp;
        const response = await fetchPaymentResult({ imp_uid, merchant_uid });

        if (!response.ok) {
          dispatch(errorOccured('결제에 실패했습니다.'));
          return;
        }

        dispatch(errorOccured('결제가 완료되었습니다.', link));
      } else {
        dispatch(errorOccured('결제에 실패했습니다.'));
        return;
      }
    });
  } catch (error) {
    dispatch(errorOccured('캠페인 생성에 실패했습니다.'));
  }
};
