import { MineModule } from './mine.module';

describe('MineModule', () => {
  let mineModule: MineModule;

  beforeEach(() => {
    mineModule = new MineModule();
  });

  it('should create an instance', () => {
    expect(mineModule).toBeTruthy();
  });
});
