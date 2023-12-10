import { BigInt, Bytes } from "@graphprotocol/graph-ts"
import {
  PlanCreated as PlanCreatedEvent,
  PlanStarted as PlanStartedEvent,
  PlanStoped as PlanStopedEvent,
  PlanTriggered as PlanTriggeredEvent,
  PlanUpdated as PlanUpdatedEvent,
} from "../generated/DollarCostAveraging/DollarCostAveraging"
import {
  User,
} from "../generated/schema"
import { store } from '@graphprotocol/graph-ts'



export function getUser(id: Bytes): User {
  let entity = User.load(id)

  if (entity == null) {
    entity = new User(id)
    entity.address = id
    entity.frequency = BigInt.fromI32(0)
    entity.planAmount = BigInt.fromI32(0)
    entity.investAmount = BigInt.fromI32(0)
    entity.totalBuy = BigInt.fromI32(0)
    entity.status = 0
  }
  return entity as User
}

/**
 * plan create
 * @param event 
 */
export function handlePlanCreated(
  event: PlanCreatedEvent
): void {
  let user = getUser(event.params.user)
  user.address = event.params.user
  user.frequency = event.params.frequency
  user.planAmount = event.params.amount
  user.investAmount = BigInt.fromI32(0)
  user.totalBuy = BigInt.fromI32(0)
  user.save()
}

/**
 * plan start
 */
export function handlePlanStarted(
  event: PlanStartedEvent
): void {
  let user = getUser(event.params.user)
  user.status = 1
  user.save()
}

/**
 * plan stop
 * @param event
 * @returns
 */
 export function handlePlanStoped(
  event: PlanStopedEvent
): void {
  let user = getUser(event.params.user)
  user.status = 0
  user.save()
}

/**
 * plan triggered
 * @param event
 * @returns
 */
 export function handlePlanTriggered(
  event: PlanTriggeredEvent
): void {
  let user = getUser(event.params.user)
  user.investAmount = user.investAmount.plus(event.params.amount)
  user.totalBuy = user.totalBuy.plus(event.params.ethReceived)
  user.save()
}

/**
 * plan updated
 * @param event
 * @returns
 */
 export function handlePlanUpdated(
  event: PlanUpdatedEvent
): void {
  let user = getUser(event.params.user)
  user.frequency = event.params.frequency
  user.planAmount = event.params.amount
  user.save()
}

