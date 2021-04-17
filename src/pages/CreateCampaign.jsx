import React from 'react';
import styled from 'styled-components';
import CampaignForm from '../components/CampaignForm';

const Container = styled.div`
  display: flex;
`;

export default function CreateCampaign() {
  async function handleNewCampaignFormSubmit(data) {
    console.log(data);
  }

  return (
    <Container>
      <CampaignForm onFormSubmit={handleNewCampaignFormSubmit}/>
    </Container>
  );
}
