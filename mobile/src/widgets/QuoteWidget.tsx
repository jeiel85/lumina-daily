import React from 'react';
import { 
  FlexWidget, 
  TextWidget, 
  ImageWidget, 
  SvgWidget, 
  WidgetProps 
} from 'react-native-android-widget';

export function QuoteWidget({ widgetInfo }: WidgetProps) {
  return (
    <FlexWidget
      style={{
        height: 'match_parent',
        width: 'match_parent',
        backgroundColor: '#0f172a',
        borderRadius: 24,
        padding: 16,
        justifyContent: 'center',
        alignItems: 'center',
      }}
      clickAction="OPEN_APP"
    >
      {/* Background Gradient Effect (Fake) */}
      <FlexWidget
        style={{
          height: 'match_parent',
          width: 'match_parent',
          backgroundColor: '#1e293b',
          borderRadius: 20,
          padding: 20,
          flexDirection: 'column',
          justifyContent: 'center',
        }}
      >
        <TextWidget
          text="오늘의 Lumina"
          style={{
            fontSize: 12,
            color: '#a855f7',
            fontWeight: 'bold',
            marginBottom: 8,
          }}
        />
        
        <TextWidget
          text="당신의 인생을 바꾸는 것은 당신의 생각입니다."
          style={{
            fontSize: 18,
            color: '#ffffff',
            fontWeight: 'bold',
            textAlign: 'center',
          }}
        />

        <TextWidget
          text="— Lumina Daily"
          style={{
            fontSize: 14,
            color: '#94a3b8',
            textAlign: 'right',
            marginTop: 12,
          }}
        />
      </FlexWidget>
    </FlexWidget>
  );
}
