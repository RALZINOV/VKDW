/* global IS_DEV */
export const DOWNLOAD_BUTTON_CLASSNAME = 'vkdw-download-button';
export const MARK_BUTTON_CLASSNAME = 'vkdw-mark-button';
export const ALBUM_DOWNLOAD_BUTTON_CLASSNAME = `${DOWNLOAD_BUTTON_CLASSNAME} album-download-btn`;
export const VK_AUDIO_ACTS_CLASSNAME = 'audio_acts';

export const AUDIO_ROWS_CLASSNAMES = [
  '.audio_playlist_wrap .audio_row',    // аудио, плеер
  '.wall_audio_rows .audio_row',        // стена в группе, стена пользователя, всплывающее окно с аудио, в комментарии
  '.post_media .audio_row',             // в сообщении
  '.search_results .audio_row',         // в результатах поиска
  '.audio_feed_rows .audio_row',        // в списке песен друзей

  // Not used:
  // module_body audio_row  - мелкий модуль в профиле
  // '.audios_module .audio_row', - в группе в блоке аудио 3шт пересекается с ^ 
  // choose_row audio_row   - при выборе песни для прикрепления
];

export const bgWorkerExtensionId = IS_DEV ?
  'jmeoclngnginpnolpkbepdjgcfjbiclc' : // develop id
  'nocmglpeldjcilaaiogodncenndbcbon';  // market id
