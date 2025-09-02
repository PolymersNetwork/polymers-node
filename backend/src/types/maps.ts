/**
 * maps.ts
 * Predefined mapping types for quick lookup in Polymers Node
 */

import { Device, DeviceEvent, DeviceMap, DeviceEventMap } from "./iot";
import { Node, NodeMap } from "./node";
import { ESGMetric, ESGMap } from "./esg";
import { TokenReward } from "./tokens";
import { User, UserMap } from "./users";
import { EventData, EventMap } from "./data";

/** Mapping of device IDs to Device objects */
export type DevicesMap = DeviceMap;

/** Mapping of event IDs to DeviceEvent objects */
export type DeviceEventsMap = DeviceEventMap;

/** Mapping of node IDs to Node objects */
export type NodesMap = NodeMap;

/** Mapping of node IDs to ESG metrics */
export type ESGMetricsMap = ESGMap;

/** Mapping of node IDs to rewards executed */
export type RewardsMap = Record<string, TokenReward>;

/** Mapping of user IDs to user profiles */
export type UsersMap = UserMap;

/** Mapping of event IDs to generic EventData objects */
export type EventsMap = EventMap;
