import XDate from 'xdate';
import React, { useCallback, useMemo } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
const TEXT_LINE_HEIGHT = 17;
const EVENT_DEFAULT_COLOR = '#add8e6';
const EventBlock = (props) => {
    const { index, event, renderEvent, onPress, format24h, styles } = props;
    // Fixing the number of lines for the event title makes this calculation easier.
    // However it would make sense to overflow the title to a new line if needed
    const numberOfLines = Math.floor(event.height / TEXT_LINE_HEIGHT);
    const formatTime = format24h ? 'HH:mm' : 'hh:mm A';
    const eventStyle = useMemo(() => {
        return {
            left: event.left,
            height: event.height,
            width: event.width,
            top: event.top,
            backgroundColor: event.color ? event.color : EVENT_DEFAULT_COLOR
        };
    }, [event]);
    const _onPress = useCallback(() => {
        onPress(index);
    }, [index, onPress]);
    return (<TouchableOpacity testID={props.testID} activeOpacity={0.9} onPress={_onPress} style={[styles.event, eventStyle]}>
    {renderEvent ? (renderEvent(event)) : (<View style={{ flex: 1, padding: 4, justifyContent: 'center' }}>
    <Text numberOfLines={2} style={[styles.eventTitle, { flexShrink: 0, lineHeight: 16 }]}>
      {event.title || 'Event'}
    </Text>
    {event.summary && event.summary.trim() !== ' ' ? (<Text numberOfLines={1} style={[styles.eventSummary, { flexShrink: 0, lineHeight: 14, marginTop: 2 }]}>
        {event.summary}
      </Text>) : null}
    {numberOfLines > 2 ? (<Text style={[styles.eventTimes, { flexShrink: 0, lineHeight: 12, marginTop: 1 }]} numberOfLines={1}>
        {new XDate(event.start).toString(formatTime)} - {new XDate(event.end).toString(formatTime)}
      </Text>) : null}
  </View>)}
    </TouchableOpacity>);
};
export default EventBlock;
