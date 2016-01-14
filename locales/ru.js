module.exports = {
  general: {
    delete: 'Удалить?',
    drop: 'Перместите __block__ сюда',
    paste: 'Или вставьте URL',
    upload: '...или выберите его',
    close: 'закрыть',
    position: 'Позиция',
    wait: 'Подождите...',
    link: 'Вставьте ссылку'
  },
  errors: {
    title: 'You have the following errors:',
    validation_fail: '__type__ block is invalid',
    block_empty: '__name__ must not be empty',
    type_missing: 'You must have a block of type __type__',
    required_type_empty: 'A required block type __type__ is empty',
    load_fail: 'There was a problem loading the contents of the document'
  },
  blocks: {
    text: {
      'title': 'Текст'
    },
    image: {
      'title': 'Загрузка картинки',
      'upload_error': 'Произошла ошибка загрузки картинки'
    },
    video: {
      'title': 'Видео'
    },
    tweet: {
      'title': 'Твиттер',
      'fetch_error': 'There was a problem fetching your tweet'
    },
    embedly: {
      'title': 'Embedly',
      'fetch_error': 'There was a problem fetching your embed',
      'key_missing': 'An Embedly API key must be present'
    }
  }
};

