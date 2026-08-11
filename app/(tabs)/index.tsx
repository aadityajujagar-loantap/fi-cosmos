import { useEffect, useState } from 'react';
import { ActivityIndicator, Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/themed-text';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { demoTasks } from '@/mocks/demo-data';
import { demoApi } from '@/services/demo-api';
import { useDemoStore } from '@/store/use-demo-store';

type DashboardData = Awaited<ReturnType<typeof demoApi.getDashboard>>;

export default function DashboardScreen() {
  const colorScheme = useColorScheme() ?? 'light';
  const palette = Colors[colorScheme];
  const [dashboard, setDashboard] = useState<DashboardData | null>(null);
  const selectedClientId = useDemoStore((state) => state.selectedClientId);
  const completedTaskIds = useDemoStore((state) => state.completedTaskIds);
  const selectClient = useDemoStore((state) => state.selectClient);

  useEffect(() => {
    let isMounted = true;

    demoApi.getDashboard().then((data) => {
      if (isMounted) {
        setDashboard(data);
      }
    });

    return () => {
      isMounted = false;
    };
  }, []);

  const completedCount = completedTaskIds.length;
  const selectedClient = dashboard?.clients.find((client) => client.id === selectedClientId);

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: palette.background }]}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <ThemedText type="title">FI iFlow</ThemedText>
          <ThemedText style={{ color: palette.muted }}>
            Frontend-only demo workspace for client walkthroughs.
          </ThemedText>
        </View>

        {!dashboard ? (
          <View style={[styles.loadingCard, { backgroundColor: palette.surface }]}>
            <ActivityIndicator color={palette.tint} />
            <ThemedText style={{ color: palette.muted }}>Loading demo data</ThemedText>
          </View>
        ) : (
          <>
            <View style={styles.metricGrid}>
              {dashboard.metrics.map((metric) => (
                <View
                  key={metric.id}
                  style={[styles.metricCard, { backgroundColor: palette.surface, borderColor: palette.border }]}>
                  <ThemedText style={{ color: palette.muted }}>{metric.label}</ThemedText>
                  <ThemedText type="subtitle">{metric.value}</ThemedText>
                  <ThemedText style={{ color: palette.success }}>{metric.delta}</ThemedText>
                </View>
              ))}
            </View>

            <View style={[styles.section, { backgroundColor: palette.surface, borderColor: palette.border }]}>
              <View style={styles.sectionHeader}>
                <ThemedText type="subtitle">Client focus</ThemedText>
                <ThemedText style={{ color: palette.muted }}>{dashboard.clients.length} accounts</ThemedText>
              </View>

              <View style={styles.clientList}>
                {dashboard.clients.map((client) => {
                  const isSelected = client.id === selectedClientId;

                  return (
                    <Pressable
                      key={client.id}
                      onPress={() => selectClient(client.id)}
                      style={[
                        styles.clientRow,
                        {
                          backgroundColor: isSelected ? palette.tint : palette.background,
                          borderColor: isSelected ? palette.tint : palette.border,
                        },
                      ]}>
                      <View style={styles.clientCopy}>
                        <ThemedText
                          type="defaultSemiBold"
                          lightColor={isSelected ? '#FFFFFF' : undefined}
                          darkColor={isSelected ? '#FFFFFF' : undefined}>
                          {client.name}
                        </ThemedText>
                        <ThemedText
                          lightColor={isSelected ? '#DBEAFE' : palette.muted}
                          darkColor={isSelected ? '#DBEAFE' : palette.muted}>
                          {client.segment}
                        </ThemedText>
                      </View>
                      <View style={styles.clientMeta}>
                        <ThemedText
                          type="defaultSemiBold"
                          lightColor={isSelected ? '#FFFFFF' : undefined}
                          darkColor={isSelected ? '#FFFFFF' : undefined}>
                          {client.balance}
                        </ThemedText>
                        <ThemedText
                          lightColor={isSelected ? '#DBEAFE' : palette.muted}
                          darkColor={isSelected ? '#DBEAFE' : palette.muted}>
                          {client.status}
                        </ThemedText>
                      </View>
                    </Pressable>
                  );
                })}
              </View>
            </View>

            <View style={styles.summaryGrid}>
              <View style={[styles.summaryCard, { backgroundColor: palette.surface, borderColor: palette.border }]}>
                <ThemedText style={{ color: palette.muted }}>Selected account</ThemedText>
                <ThemedText type="defaultSemiBold">{selectedClient?.name ?? 'Choose a client'}</ThemedText>
              </View>
              <View style={[styles.summaryCard, { backgroundColor: palette.surface, borderColor: palette.border }]}>
                <ThemedText style={{ color: palette.muted }}>Task progress</ThemedText>
                <ThemedText type="defaultSemiBold">
                  {completedCount} of {demoTasks.length} complete
                </ThemedText>
              </View>
            </View>

            <View style={[styles.section, { backgroundColor: palette.surface, borderColor: palette.border }]}>
              <ThemedText type="subtitle">Recent activity</ThemedText>
              {dashboard.activity.map((activity) => (
                <View key={activity.id} style={[styles.activityRow, { borderColor: palette.border }]}>
                  <View style={[styles.activityDot, { backgroundColor: palette.tint }]} />
                  <View style={styles.activityCopy}>
                    <ThemedText type="defaultSemiBold">{activity.title}</ThemedText>
                    <ThemedText style={{ color: palette.muted }}>{activity.detail}</ThemedText>
                  </View>
                  <ThemedText style={{ color: palette.muted }}>{activity.time}</ThemedText>
                </View>
              ))}
            </View>
          </>
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
  loadingCard: {
    alignItems: 'center',
    borderRadius: 8,
    gap: 12,
    padding: 24,
  },
  metricGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  metricCard: {
    borderRadius: 8,
    borderWidth: 1,
    flexGrow: 1,
    gap: 6,
    minWidth: 150,
    padding: 16,
  },
  section: {
    borderRadius: 8,
    borderWidth: 1,
    gap: 14,
    padding: 16,
  },
  sectionHeader: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  clientList: {
    gap: 10,
  },
  clientRow: {
    alignItems: 'center',
    borderRadius: 8,
    borderWidth: 1,
    flexDirection: 'row',
    gap: 12,
    justifyContent: 'space-between',
    padding: 14,
  },
  clientCopy: {
    flex: 1,
    gap: 2,
  },
  clientMeta: {
    alignItems: 'flex-end',
    gap: 2,
  },
  summaryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  summaryCard: {
    borderRadius: 8,
    borderWidth: 1,
    flex: 1,
    gap: 4,
    minWidth: 150,
    padding: 16,
  },
  activityRow: {
    alignItems: 'center',
    borderTopWidth: 1,
    flexDirection: 'row',
    gap: 12,
    paddingTop: 12,
  },
  activityDot: {
    borderRadius: 5,
    height: 10,
    width: 10,
  },
  activityCopy: {
    flex: 1,
    gap: 2,
  },
});
