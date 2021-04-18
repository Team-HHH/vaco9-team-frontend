import React from 'react';
import styled from 'styled-components';
import CampaignForm from '../components/CampaignForm';

const Container = styled.div`
  display: flex;
`;

export default function CreateCampaign() {
  const IMP = window.IMP;
  IMP.init(process.env.REACT_APP_IMPORT_ID);

  async function handleNewCampaignFormSubmit(data) {

    IMP.request_pay({
      pg: 'html5_inicis',
      pay_method: 'card',
      merchant_uid: 'ORD20180131-0000012',
      name: data.title,
      amount: data.dailyBudget,
      buyer_email: 'hcplays@gmail.com',
      buyer_name: '김희찬',
      buyer_tel: '010-8895-8278',
    }, rsp => {
      if (rsp.success) {
        console.log('결제 성공');
        console.log(rsp);
      } else {
        console.log('결제 실패');
        console.log(rsp);
      }
    });
  }

  return (
    <Container>
      <CampaignForm onFormSubmit={handleNewCampaignFormSubmit}/>
    </Container>
  );
}
