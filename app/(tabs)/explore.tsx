import { useEffect, useMemo, useState } from 'react';
import { ActivityIndicator, Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/themed-text';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { demoApi } from '@/services/demo-api';
import { useDemoStore } from '@/store/use-demo-store';
import type { DemoTask } from '@/types/demo';

const priorityColor = {
  High: 'danger',
  Medium: 'warning',
  Low: 'success',
} as const;

export default function FlowScreen() {
  const colorScheme = useColorScheme() ?? 'light';
  const palette = Colors[colorScheme];
  const [tasks, setTasks] = useState<DemoTask[] | null>(null);
  const completedTaskIds = useDemoStore((state) => state.completedTaskIds);
  const toggleTask = useDemoStore((state) => state.toggleTask);
  const resetDemo = useDemoStore((state) => state.resetDemo);

  useEffect(() => {
    let isMounted = true;

    demoApi.getTasks().then((data) => {
      if (isMounted) {
        setTasks(data);
      }
    });

    return () => {
      isMounted = false;
    };
  }, []);

  const completionLabel = useMemo(() => {
    if (!tasks?.length) {
      return '0%';
    }

    return `${Math.round((completedTaskIds.length / tasks.length) * 100)}%`;
  }, [completedTaskIds.length, tasks]);

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: palette.background }]}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <ThemedText type="title">Demo flow</ThemedText>
          <ThemedText style={{ color: palette.muted }}>
            Tap tasks to complete them. The state persists locally for repeat demos.
          </ThemedText>
        </View>

        <View style={[styles.progressCard, { backgroundColor: palette.surface, borderColor: palette.border }]}>
          <View>
            <ThemedText style={{ color: palette.muted }}>Completion</ThemedText>
            <ThemedText type="subtitle">{completionLabel}</ThemedText>
          </View>
          <Pressable
            onPress={resetDemo}
            style={[styles.resetButton, { borderColor: palette.border, backgroundColor: palette.background }]}>
            <ThemedText type="defaultSemiBold">Reset demo</ThemedText>
          </Pressable>
        </View>

        {!tasks ? (
          <View style={[styles.loadingCard, { backgroundColor: palette.surface }]}>
            <ActivityIndicator color={palette.tint} />
            <ThemedText style={{ color: palette.muted }}>Preparing task flow</ThemedText>
          </View>
        ) : (
          <View style={styles.taskList}>
            {tasks.map((task, index) => {
              const isComplete = completedTaskIds.includes(task.id);
              const priorityKey = priorityColor[task.priority];

              return (
                <Pressable
                  key={task.id}
                  onPress={() => toggleTask(task.id)}
                  style={[
                    styles.taskCard,
                    {
                      backgroundColor: palette.surface,
                      borderColor: isComplete ? palette.tint : palette.border,
                    },
                  ]}>
                  <View
                    style={[
                      styles.stepBadge,
                      {
                        backgroundColor: isComplete ? palette.tint : palette.background,
                        borderColor: isComplete ? palette.tint : palette.border,
                      },
                    ]}>
                    <ThemedText
                      type="defaultSemiBold"
                      lightColor={isComplete ? '#FFFFFF' : palette.text}
                      darkColor={isComplete ? '#FFFFFF' : palette.text}>
                      {isComplete ? 'Done' : String(index + 1)}
                    </ThemedText>
                  </View>

                  <View style={styles.taskBody}>
                    <View style={styles.taskHeader}>
                      <ThemedText type="defaultSemiBold">{task.title}</ThemedText>
                      <ThemedText style={{ color: palette[priorityKey] }}>{task.priority}</ThemedText>
                    </View>
                    <ThemedText style={{ color: palette.muted }}>Owner: {task.owner}</ThemedText>
                    <ThemedText style={{ color: palette.muted }}>Due: {task.due}</ThemedText>
                  </View>
                </Pressable>
              );
            })}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  content: {
    gap: 16,
    padding: 20,
    paddingBottom: 32,
  },
  header: {
    gap: 8,
  },
  progressCard: {
    alignItems: 'center',
    borderRadius: 8,
    borderWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
  },
  resetButton: {
    borderRadius: 8,
    borderWidth: 1,
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  loadingCard: {
    alignItems: 'center',
    borderRadius: 8,
    gap: 12,
    padding: 24,
  },
  taskList: {
    gap: 12,
  },
  taskCard: {
    alignItems: 'flex-start',
    borderRadius: 8,
    borderWidth: 1,
    flexDirection: 'row',
    gap: 12,
    padding: 16,
  },
  stepBadge: {
    alignItems: 'center',
    borderRadius: 8,
    borderWidth: 1,
    height: 44,
    justifyContent: 'center',
    minWidth: 44,
    paddingHorizontal: 8,
  },
  taskBody: {
    flex: 1,
    gap: 6,
  },
  taskHeader: {
    alignItems: 'flex-start',
    gap: 6,
  },
});
