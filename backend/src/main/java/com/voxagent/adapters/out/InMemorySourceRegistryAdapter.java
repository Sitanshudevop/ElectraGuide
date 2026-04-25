package com.voxagent.adapters.out;

import com.voxagent.core.domain.SourceRecord;
import com.voxagent.core.ports.SourceRegistryPort;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.TreeMap;

/**
 * In-memory adapter for the SourceRegistryPort.
 * Uses a TreeMap (Balanced Binary Search Tree / Red-Black Tree) to guarantee
 * O(log n) complexity for findById and save operations as per technical stack requirements.
 */
@Repository
public class InMemorySourceRegistryAdapter implements SourceRegistryPort {

    // TreeMap guarantees log(n) time cost for the containsKey, get, put and remove operations.
    private final TreeMap<String, SourceRecord> index = new TreeMap<>();

    @Override
    public Optional<SourceRecord> findById(String sourceId) {
        return Optional.ofNullable(index.get(sourceId));
    }

    @Override
    public void save(SourceRecord record) {
        index.put(record.getSourceId(), record);
    }
}
