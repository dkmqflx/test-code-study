import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

export default async component => {
  const user = userEvent.setup();
  // userEvent는 클릭과 같은 이벤트를 실제 브라우저와 유사하게 시뮬레이션할 수 있다

  return {
    user,
    ...render(component),
  };
};
