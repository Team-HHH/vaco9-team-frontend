const getOverviewData = (campaign, todayIndex) => {
  if (campaign === undefined) return null;
  if (campaign.stats.length === 0) return null;
  if (!campaign?.stats[todayIndex]) return null;

  return {
    reach: campaign?.stats[todayIndex].reach.toLocaleString() + '회',
    reachNetChange: !campaign?.stats[todayIndex - 1] ? '' : ((campaign?.stats[todayIndex].reach - campaign?.stats[todayIndex - 1].reach) / campaign?.stats[todayIndex - 1].reach * 100).toFixed(2).toLocaleString() + '%',
    click: campaign?.stats[todayIndex].click.toLocaleString() + '회',
    clickNetChange: !campaign?.stats[todayIndex - 1] ? '' : ((campaign?.stats[todayIndex].click - campaign?.stats[todayIndex - 1].click) / campaign?.stats[todayIndex - 1].click * 100).toFixed(2).toLocaleString() + '%',

    cpm: (campaign?.stats[todayIndex].usedBudget / campaign?.stats[todayIndex].reach * 1000).toFixed(2).toLocaleString() + '원',
    cpmNetChange: !campaign?.stats[todayIndex - 1] ? '' : ((campaign?.stats[todayIndex].usedBudget / campaign?.stats[todayIndex].reach * 1000 - campaign?.stats[todayIndex - 1].usedBudget / campaign?.stats[todayIndex - 1].reach * 1000) / (campaign?.stats[todayIndex - 1].usedBudget / campaign?.stats[todayIndex - 1].reach * 1000)).toFixed(2).toLocaleString() + '%',

    ctr: ((campaign?.stats[todayIndex].click / campaign?.stats[todayIndex].reach) * 100).toFixed(2).toLocaleString() + '%',
    ctrNetChange: !campaign?.stats[todayIndex - 1] ? '' : ((campaign?.stats[todayIndex].click / campaign?.stats[todayIndex].reach - campaign?.stats[todayIndex - 1].click / campaign?.stats[todayIndex - 1].reach) / (campaign?.stats[todayIndex - 1].click / campaign?.stats[todayIndex - 1].reach) * 100).toFixed(2).toLocaleString() + '%',
    cpc: campaign?.stats[todayIndex].click !== 0 ? (campaign?.stats[todayIndex].usedBudget / campaign?.stats[todayIndex].click).toFixed(0).toLocaleString() + '원' : '데이터가 없습니다',
    cpcNetChange: !campaign?.stats[todayIndex - 1] ? '' : (((campaign?.stats[todayIndex].usedBudget / campaign?.stats[todayIndex].click) - (campaign?.stats[todayIndex - 1].usedBudget / campaign?.stats[todayIndex - 1].click)) / (campaign?.stats[todayIndex - 1].usedBudget / campaign?.stats[todayIndex - 1].click)).toFixed(2).toLocaleString() + '%',
  };
};

export default getOverviewData;
