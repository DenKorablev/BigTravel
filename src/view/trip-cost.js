export const createTripCostTemplate = (points) => {
  let total = points.reduce((acc, rcc) => acc + rcc.price, 0);
  points.forEach((travel) => {
    if (travel.offers.length) {
      total += travel.offers.reduce((acc, rcc) => acc + rcc.price, 0);
    }
  });

  return `
    <p class="trip-info__cost">
      Total: &euro;&nbsp;<span class="trip-info__cost-value">${total}</span>
    </p>
  `;
};
