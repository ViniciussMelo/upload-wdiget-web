import * as Collapsible from '@radix-ui/react-collapsible'
import { Minimize2 } from 'lucide-react';

import { UploadWidgetTitle } from './upload-widget-title';
import { Button } from './ui/button';

export function UploadWidgetHeader() {
  return (
    <div className='w-full p-4 py-2 bg-white/2 border-zinc-800 border-b flex items-center justify-between'>
      <UploadWidgetTitle />
      
      <Collapsible.Trigger asChild>
        <Button size='icon' className='-mr-2'>
          <Minimize2 strokeWidth={1.5} className='size-4 text-zinc-100'/>
        </Button>
      </Collapsible.Trigger>
    </div>
  )
}