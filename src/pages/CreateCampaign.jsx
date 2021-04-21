import React from 'react';
import styled from 'styled-components';
import { parseISO, differenceInCalendarDays } from 'date-fns';
import CampaignForm from '../components/CampaignForm';
import { fetchPaymentResult } from '../apis/payment';
import { fetchNewCampaign } from '../apis/campaigns';

const Container = styled.div`
  display: flex;
`;

export default function CreateCampaign() {
  const IMP = window.IMP;
  IMP.init(process.env.REACT_APP_IMPORT_ID);

  async function handleNewCampaignFormSubmit(data) {
    const campaignDuration = differenceInCalendarDays(parseISO(data.expiresAt), new Date());

    try {
      const response = await fetchNewCampaign(data);
      const responseBody = await response.json();

      if (!response.ok) {
        return;
      }

      const { merchantId } = responseBody.data;

      IMP.request_pay({
        pg: 'html5_inicis',
        pay_method: 'card',
        merchant_uid: merchantId,
        name: data.title,
        amount: data.dailyBudget * campaignDuration,
        buyer_email: 'test@gmail.com',
        buyer_name: '홍길동',
        buyer_tel: '010-1234-5678',
      }, async (rsp) => {
        if (rsp.success) {
          const { imp_uid, merchant_uid } = rsp;
          const response = await fetchPaymentResult({ imp_uid, merchant_uid });

          if (!response.ok) {
            return;
          }
        } else {
          return;
        }
      });
    } catch (err) {
      return;
    }
  }

  return (
    <Container>
      <CampaignForm onFormSubmit={handleNewCampaignFormSubmit}/>
    </Container>
  );
}
