module.exports = {
    ci: {
      collect: {
        startServerCommand: 'yarn start',
        url: ['http://localhost:3000']
      },
      assert: {
        assertions: {
          'categories:performance': ['warn', {minScore: 2}],
          'categories:accessibility': ['error', {minScore: 2}]
        }
      },
      upload: {
        target: 'temporary-public-storage',
      },
    },
  };