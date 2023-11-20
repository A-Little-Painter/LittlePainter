import React from 'react';
import Popover from 'react-native-popover-view';

function App() {
  return (
    <Popover
      from={
        <TouchableOpacity>
          <Text>Press here to open popover!</Text>
        </TouchableOpacity>
      }>
      <Text>This is the contents of the popover</Text>
    </Popover>
  );
}
