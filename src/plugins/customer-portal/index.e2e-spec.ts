import * as assert from 'assert';
import * as child from 'child_process';
import * as path from 'path';
import CustomerPortal from '.';

describe(CustomerPortal.name, () => {
  it('should enable', function() {
    this.timeout(1000 * 60);
    this.slow(1000 * 15);
    const enableCmd = child.spawnSync(path.resolve('bin', 'run'), [
      'browserforce:shape:apply',
      '-f',
      path.resolve(path.join(__dirname, 'enable.json'))
    ]);
    assert.deepEqual(enableCmd.status, 0, enableCmd.output.toString());
    assert(/to 'true'/.test(enableCmd.output.toString()));
  });
  it('should fail to disable', function() {
    this.timeout(1000 * 60);
    this.slow(1000 * 15);
    const disableCmd = child.spawnSync(path.resolve('bin', 'run'), [
      'browserforce:shape:apply',
      '-f',
      path.resolve(path.join(__dirname, 'disable.json'))
    ]);
    assert.deepEqual(disableCmd.status, 1, disableCmd.output.toString());
    assert(/to 'false'/.test(disableCmd.output.toString()));
    assert(/cannot be disabled/.test(disableCmd.output.toString()));
  });
});