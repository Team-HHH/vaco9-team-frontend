import React from 'react';
import styled from 'styled-components';
import CampaignForm from '../components/CampaignForm';
import { fetchNewCampaign, fetchPaymentResult } from '../apis/payment';

const Container = styled.div`
  display: flex;
`;

export default function CreateCampaign() {
  const IMP = window.IMP;
  IMP.init(process.env.REACT_APP_IMPORT_ID);

  async function handleNewCampaignFormSubmit(data) {
    console.log(data);
    try {
      const response = await fetchNewCampaign(data);

      if (!response.ok) {
        console.log('결제에 실패했습니다.');
        return;
      }

      const { merchantId } = response.body.data;

      IMP.request_pay({
        pg: 'html5_inicis',
        pay_method: 'card',
        merchant_uid: merchantId,
        name: data.title,
        amount: data.dailyBudget,
        buyer_email: 'hcplays@gmail.com',
        buyer_name: '김희찬',
        buyer_tel: '010-8895-8278',
      }, rsp => {
        if (rsp.success) {
          console.log('결제 성공');
          const response = await fetchPaymentResult(rsp);

          if (!response.ok) {
            console.log('결제에 실패했습니다.');
            return;
          }
        } else {
          console.log('결제 실패');
          console.log(rsp);
        }
      });
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <Container>
      <CampaignForm onFormSubmit={handleNewCampaignFormSubmit}/>
    </Container>
  );
}
