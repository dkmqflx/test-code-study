import { rest } from 'msw';

import response from '@/__mocks__/response';
import { apiRoutes } from '@/apiRoutes';

const API_DOMAIN = 'http://localhost:3000';

// API 호출 시 정해진 응답값 반환하도록 구현 -> 스텁
// 에러 처리나 다양한 응답의 케이스를 고려하여 구현된 것이 아님
// -> 고려된 케이스 이외에는 대응할 수 없음

// 보통 프런트엔드의 단위 테스트나 통합테스트에서는 외부 모듈의 일부 기능만 필요할 때가 있는데 이 때 스텁을 많이 사용한다
// 실제 예시 프로젝트에서도 React 라우터의 useNavigate, useLocation에 대한 구현을 스텁이나 spy로 대체한 경우가 많다
export const handlers = [
  ...[
    apiRoutes.users,
    apiRoutes.product,
    apiRoutes.categories,
    apiRoutes.couponList,
  ].map(path =>
    rest.get(`${API_DOMAIN}${path}`, (_, res, ctx) =>
      res(ctx.status(200), ctx.json(response[path])),
    ),
  ),
  rest.get(`${API_DOMAIN}${apiRoutes.products}`, (req, res, ctx) => {
    const data = response[apiRoutes.products];
    const offset = Number(req.url.searchParams.get('offset'));
    const limit = Number(req.url.searchParams.get('limit'));
    const products = data.products.filter(
      (_, index) => index >= offset && index < offset + limit,
    );

    // 응답 코드나 상품 데이터에 대한 값은 고정되어 있지만 lastPage를 계산하는 로직 존재
    // 고정된 값을 반환하지 않고, 아주 단순한 구현을 통해 값을 반환하는 것까지 스텁의 범주로 볼 수 있음
    return res(
      ctx.status(200),
      ctx.json({ products, lastPage: products.length < limit }),
    );
  }),
  rest.get(`${API_DOMAIN}${apiRoutes.profile}`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(null));
  }),
  rest.post(`${API_DOMAIN}${apiRoutes.users}`, (req, res, ctx) => {
    if (req.body.name === 'FAIL') {
      return res(ctx.status(500));
    }

    return res(ctx.status(200));
  }),
  rest.post(`${API_DOMAIN}${apiRoutes.login}`, (req, res, ctx) => {
    if (req.body.email === 'FAIL@gmail.com') {
      return res(ctx.status(401));
    }

    return res(
      ctx.status(200),
      ctx.json({
        access_token: 'access_token',
      }),
    );
  }),
  rest.post(`${API_DOMAIN}${apiRoutes.log}`, (_, res, ctx) => {
    return res(ctx.status(200));
  }),
];
