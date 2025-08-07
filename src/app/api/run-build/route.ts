// app/api/run-build/route.ts

import { NextResponse } from 'next/server';
import { exec } from 'child_process';
import path from 'path';
import { promisify } from 'util';

const execAsync = promisify(exec);
const isWindows = process.platform === 'win32';

export async function GET() {
  try {
    const scriptPath = path.join(
      process.cwd(),
      'scripts',
      isWindows ? 'build_and_restart.bat' : 'build_and_restart.sh'
    );
    const command = isWindows ? `cmd /c "${scriptPath}"` : `bash ${scriptPath}`;

    const { stdout, stderr } = await execAsync(command, { windowsHide: true });

    console.log('STDOUT:', stdout);
    console.error('STDERR:', stderr);

    return NextResponse.json({ message: 'Success', stdout, stderr });
  } catch (error: any) {
    console.error('EXEC ERROR:', error);
    return NextResponse.json({ message: error.message || 'Lỗi không xác định' }, { status: 500 });
  }
}
