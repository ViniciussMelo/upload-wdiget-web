import { UploadWidgetUploadItem } from './upload-widget-upload-item';
import { useUploads } from '../store/uploads';

export function UploadWidgetUploadList() {
  // only render when there is a change on the uploads list
  const uploads = useUploads(state => state.uploads);

  const isUploadListEmpty = uploads.size === 0;

  return (
    <div className="px-3 flex flex-col gap-3">
      <span className="text-xs font-medium">
        Uploaded files <span className="text-zinc-400">({uploads.size})</span>
      </span>

      {isUploadListEmpty ? (
        <span className="text-xs text-zinc-400">No uploads added</span>
      ) : (
        <div className="flex flex-col gap-2">
          {Array.from(uploads.entries()).map(([uploadId, upload]) => (
            <UploadWidgetUploadItem 
              key={uploadId} 
              upload={upload} 
              uploadId={uploadId} 
            />
          ))}
        </div>
      )}
    </div>
  )
}